import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { RolesGuard } from "../../shared/guards/roles.guard";
import { Roles } from "../../shared/roles.decorator";
import { Role } from "../../domain/model/enum/role";
import { CreateMediaResponseDto } from "./dto/response/create-media-response.dto";
import { CreateMediaCommand } from "./application/command/create-media.command";
import { CommandBus } from "@nestjs/cqrs";
import { FileInterceptor } from "@nestjs/platform-express";
import { DeleteMediaRequestDto } from "./dto/request/delete-media-request.dto";
import { DeleteMediaCommand } from "./application/command/delete-media.command";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Media")
@Controller("media")
export class MediaController {
  constructor(private readonly commandBus: CommandBus) {
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary"
        }
      }
    }
  })
  @Roles(Role.ADMIN, Role.CLIENT)
  @UseInterceptors(FileInterceptor("file"))
  async createMedia(@Req() request, @UploadedFile(
    new ParseFilePipeBuilder()
      .addMaxSizeValidator({
        maxSize: 10000000 // environ 10Mo
      })
      .addFileTypeValidator({
        fileType: /(jpg|jpeg|png)$/
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }))
    file: Express.Multer.File): Promise<CreateMediaResponseDto> {
    return await this.commandBus.execute<CreateMediaCommand, CreateMediaResponseDto>(CreateMediaCommand.of(file.buffer, file.originalname));
  };

  @Delete("/:mediaId")
  @Roles(Role.ADMIN, Role.CLIENT)
  async deleteMedia(@Param() deleteMediaRequest: DeleteMediaRequestDto): Promise<void> {
    await this.commandBus.execute<DeleteMediaRequestDto, void>(DeleteMediaCommand.of(deleteMediaRequest));
  }
}
