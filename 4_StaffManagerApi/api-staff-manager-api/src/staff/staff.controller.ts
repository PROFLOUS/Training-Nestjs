import { Body, CacheInterceptor, CacheKey, CacheTTL, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags,ApiCreatedResponse,ApiQuery, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

import { Request } from 'express';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffService } from './staff.service';

@ApiTags('staffs')
@Controller('staff')
@ApiBearerAuth('jwt')
@UseGuards(AccessTokenGuard)
export class StaffController {

    constructor(private readonly staffService:StaffService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async createStaff(@UploadedFile() file, @Body() createStaffDto:CreateStaffDto) {
        if(!file) return this.staffService.create(createStaffDto);
        const imageUrl = await this.staffService.upload(file);
        console.log('img',imageUrl);
        if(imageUrl){
            createStaffDto.image = imageUrl.Location;
        }
        return this.staffService.create(createStaffDto);
    }

    // @UseInterceptors(CacheInterceptor)
    // @CacheKey('staffAll')
    // @CacheTTL(30)
    // @Roles('ADMIN')
    // @UseGuards(AccessTokenGuard,RolesGuard)    
    
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @Get()
    async findAll(@Req() req:Request) {
        return this.staffService.findAll();
    }

    @Get(':id')
    @ApiCreatedResponse({description:'get by id'})
    async findById(@Param('id') id:string) {
       try {
        return this.staffService.findById(id);
       } catch (error) {
        console.log("error",error.message);
        return error.message;
       }
    }

    @Get(':email')
    async findByEmail(@Param('email') email:string) {
        return this.staffService.findByEmail(email);
    }

    @Patch(':id')
    async update(@Param('id') id:string, @Body() updateStaffDto: UpdateStaffDto ) {
        return this.staffService.update(id, updateStaffDto);
    }

    @Delete(':id')
    async remove(@Param('id') id:string) {
        console.log(id);
        return this.staffService.remove(id);
    }

    @Patch('active/:id')
    @ApiCreatedResponse({description:'active'})
    async active(@Param('id') id:string, @Req() req:Request) {
        const {isActived} = req.body;
        return this.staffService.updateIsActived(id,isActived);
    }

    @Patch('change-password/:id')
    async changePassword(@Param('id') id:string, @Req() req:Request) {
        const {password} = req.body;
        const {newPassword} = req.body;
        return this.staffService.updatePassword(id,password,newPassword);
    }

    @Patch('change-role/:id')
    async changeRole(@Param('id') id:string, @Req() req:Request) {
        const {role} = req.body;
        return this.staffService.updateRole(id,role);
    }

    @ApiQuery({name:'name',required:false})
    @ApiQuery({name:'email',required:false})
    @ApiQuery({name:'phone',required:false})
    @ApiQuery({name:'role',required:false})    
    @Get('filter/all')
    async filter( @Req() req:Request ) {
        return this.staffService.filter(req.query);
    }

    
}
