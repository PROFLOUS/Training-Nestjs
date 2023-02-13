import { Body, CacheInterceptor, CacheKey, CacheTTL, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {

    constructor(private readonly staffService:StaffService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async createStaff(@UploadedFile() file, @Body() createStaffDto:CreateStaffDto) {
        const imageUrl = await this.staffService.upload(file);
        console.log('img',imageUrl);
        createStaffDto.image = imageUrl.Location;
        return this.staffService.create(createStaffDto);
    }

    @UseInterceptors(CacheInterceptor)
    @CacheKey('staffAll')
    @CacheTTL(30)
    @Get()
    async findAll() {
        return this.staffService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id:string) {
        return this.staffService.findById(id);
    }

    @Get(':email')
    async findByEmail(@Param('email') email:string) {
        return this.staffService.findByEmail(email);
    }

    @Patch(':id')
    async update(@Param('id') id:string, @Body() updateStaffDto:CreateStaffDto) {
        return this.staffService.update(id, updateStaffDto);
    }

    @Delete(':id')
    async remove(@Param('id') id:string) {
        console.log(id);
        return this.staffService.remove(id);
    }
}
