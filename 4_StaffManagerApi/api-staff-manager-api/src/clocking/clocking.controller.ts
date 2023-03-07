import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ClockingService } from './clocking.service';
import { CreateClockingDto } from './dto/create-clocking.dto';
import { UpdateClockingDto } from './dto/update-clocking.dto';

@ApiTags('clockings')
@Controller('clocking')
export class ClockingController {
  constructor(private readonly clockingService: ClockingService) {}

  @Post('/clockin/:id')
  createClockIn(@Param('id') id: string) {
    try {
      return this.clockingService.createClockIn(id);
    }
    catch (err) {
        throw new Error(err);
    }
  }

  @Patch('/clockout/:id')
  createClockOut( @Param('id') id: string) {
    try {
      return this.clockingService.createClockOut(id);
    }
    catch (err) {
        throw new Error(err);
    }
  }

  @Get('/all')
  findByMonth(@Query('month') month: number,@Query('year') year: number) {
    return this.clockingService.findByMon(month,year);
  }

  @Get('/staff')
  findByStaffWithMY(@Query('id') staffId: string,@Query('month') month: number,@Query('year') year: number) {
    return this.clockingService.findByStaffWithMY(staffId,month,year);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clockingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClockingDto: UpdateClockingDto) {
    return this.clockingService.update(id, updateClockingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.clockingService.remove(id);
    }
    catch (err) {
       throw new Error(err);
    }
  }
}
