import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { ApiTags } from '@nestjs/swagger';
import { CreateChargeRequestDto } from "./dto/request/create-charge-request.dto";

@ApiTags('Stripe')
@Controller('stripe')
@UseGuards(JwtAuthGuard)
export default class ChargeController {
  constructor(
    private readonly stripeService: StripeService
  ) {}

  @Post('/charge')
  async createCharge(@Body() charge: CreateChargeRequestDto, @Req() request) {
    await this.stripeService.charge(charge.amount, charge.paymentMethodId, request.user.stripeCustomerId);
  }
}