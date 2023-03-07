import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PremmissionFormService } from './premmission-form.service';
import { CreatePremmissionFormDto } from './dto/create-premmission-form.dto';
import { UpdatePremmissionFormDto } from './dto/update-premmission-form.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApproveDto } from './dto/approve.dto';

@ApiTags('PremmissionForm')
@Controller('premmission-form')
export class PremmissionFormController {
  constructor(private readonly premmissionFormService: PremmissionFormService) {}

  @Post()
  create(@Body() createPremmissionFormDto: CreatePremmissionFormDto) {
    return this.premmissionFormService.create(createPremmissionFormDto);
  }

  @Get()
  findAll() {
    return this.premmissionFormService.findAll();
  }

  @ApiQuery({name:'month',required:false})
  @ApiQuery({name:'year',required:false})
  @Get('/staff/:id/status/:status')
  findByStaffId(@Param('id') id: string,@Param('status') status: string,@Query('month') month: number,@Query('year') year: number) {
    return this.premmissionFormService.findByStaffId(id,status,month,year);
  }

  @Get('/approver/:id')
  findByApproverId(@Param('id') id: string) {
    return this.premmissionFormService.findByApproverId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePremmissionFormDto: UpdatePremmissionFormDto) {
    return this.premmissionFormService.update(id, updatePremmissionFormDto);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string,@Body() approveDto: ApproveDto) {
    return this.premmissionFormService.approve(id, approveDto);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.premmissionFormService.remove(id);
  }
}
