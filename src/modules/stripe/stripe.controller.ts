import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import StripeService from "../stripe/stripe.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateChargeRequestDto } from "./dto/request/create-charge-request.dto";
import { RolesGuard } from "../../shared/guards/roles.guard";
import { Roles } from "../../shared/roles.decorator";
import { Role } from "../../domain/model/enum/role";

@ApiTags('Stripe')
@Controller('stripe')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export default class StripeController {
  constructor(
    private readonly stripeService: StripeService
  ) {}

  @Roles(Role.CLIENT, Role.ADMIN)
  @Post('/charge')
  async createCharge(@Body() charge: CreateChargeRequestDto, @Req() request) {
    await this.stripeService.charge(charge.amount, charge.paymentMethodId, request.user.stripeCustomerId);
  }
}