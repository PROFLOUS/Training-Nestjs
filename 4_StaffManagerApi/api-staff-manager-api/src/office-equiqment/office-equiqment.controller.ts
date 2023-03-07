import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OfficeEquiqmentService } from './office-equiqment.service';
import { CreateOfficeEquiqmentDto } from './dto/create-office-equiqment.dto';
import { UpdateOfficeEquiqmentDto } from './dto/update-office-equiqment.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StaffService } from 'src/staff/staff.service';

@ApiTags('OfficeEquiqments')
@Controller('office-equiqment')
export class OfficeEquiqmentController {
  constructor(
    private readonly officeEquiqmentService: OfficeEquiqmentService,
    private readonly staffService: StaffService,
    ) {}

  @Post()
  create(@Body() createOfficeEquiqmentDto: CreateOfficeEquiqmentDto) {
    return this.officeEquiqmentService.create(createOfficeEquiqmentDto);
  }

  @Get('/all')
  @ApiOperation({summary:'List of all OfficeEquiqment'})
  findAll() {
    return this.officeEquiqmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officeEquiqmentService.findOne(id);
  }

  @ApiOperation({summary:'List of OfficeEquiqment in Use 🌟'})
  @Get()
  listOEquipmentInUse(){
    return this.officeEquiqmentService.getListOEquipmentInUsed();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfficeEquiqmentDto: UpdateOfficeEquiqmentDto) {
    return this.officeEquiqmentService.update(id, updateOfficeEquiqmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officeEquiqmentService.remove(id);
  }


  @ApiOperation({summary:'Add OfficeEquiqment to Staff 🌟'})
  @Post(':id/staff/:staffId')
  @ApiQuery({name:'qty',required:false})
  addOfficeEquiqmentToStaff(@Param('id') id: string,@Param('staffId') staffId: string,@Query('qty') quantity: number) {
    return this.officeEquiqmentService.addOfficeEquiqmentToStaff(id, staffId, quantity);
  }

  @ApiOperation({summary:'Remove OfficeEquiqment from Staff'})
  @ApiQuery({name:'qty',required:false})
  @Patch(':id/updateqty/:staffId')
  updateOEquipment(@Param('id') oeId: string ,@Param('staffId') staffId: string,@Query('qty') quantity: number) {
    return this.officeEquiqmentService.removeOfficeEquiqmentFromStaff(oeId, staffId,quantity);
  }

  @ApiOperation({summary:'Remove All OfficeEquiqment from Staff'})
  @Patch('updateAllqty/:staffId')
  updateOEquipmentRemoveAll(@Param('staffId') id: string) {
    return this.officeEquiqmentService.removeAllOfficeEquiqmentFromStaff(id);
  }

  @ApiOperation({summary:'Update Status OfficeEquiqment from Staff'})
  @ApiQuery({name:'status',required:false})
  @Patch(':id/updateStatusOE/:staffId')
  updateStatusOEquipment(@Param('id') oeId: string ,@Param('staffId') staffId: string,@Query('status') status: string) {
    return this.staffService.updateStatusOEquipment(staffId,{oEId:oeId,status:status});
  }

}
