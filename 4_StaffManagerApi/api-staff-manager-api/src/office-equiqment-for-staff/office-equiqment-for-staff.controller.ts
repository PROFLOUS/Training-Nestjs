import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OfficeEquiqmentForStaffService } from './office-equiqment-for-staff.service';
import { CreateOfficeEquiqmentForStaffDto } from './dto/create-office-equiqment-for-staff.dto';
import { UpdateOfficeEquiqmentForStaffDto } from './dto/update-office-equiqment-for-staff.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('OfficeEquiqmentForStaff')
@Controller('office-equiqment-for-staff')
export class OfficeEquiqmentForStaffController {
  constructor(private readonly officeEquiqmentForStaffService: OfficeEquiqmentForStaffService) {}

  @Post()
  create(@Body() createOfficeEquiqmentForStaffDto: CreateOfficeEquiqmentForStaffDto) {
    return this.officeEquiqmentForStaffService.create(createOfficeEquiqmentForStaffDto);
  }

  @ApiOperation({summary:'List of all OfficeEquiqmentForStaff'})
  @Get()
  findAll() {
    return this.officeEquiqmentForStaffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officeEquiqmentForStaffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfficeEquiqmentForStaffDto: UpdateOfficeEquiqmentForStaffDto) {
    return this.officeEquiqmentForStaffService.update(+id, updateOfficeEquiqmentForStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officeEquiqmentForStaffService.remove(+id);
  }
}
