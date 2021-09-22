import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateTenantDto, ReadTenantDto } from '../dtos';
import { TenancyService } from '../services/tenancy.service';

@Controller('tenants')
export class TenancyController {
  constructor(private readonly tenantService: TenancyService) {}

  @Get()
  findAll(): Promise<ReadTenantDto[]> {
    return this.tenantService.findAll();
  }

  @Post()
  create(@Body() tenant: CreateTenantDto): Promise<ReadTenantDto> {
    return this.tenantService.create(tenant);
  }
}