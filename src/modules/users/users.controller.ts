import { 
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersServices.createUser(createUserDto);
  }

  @Get()
  findAllUsers() {
    return this.usersServices.findAllUsers();
  }

  @Get(':id')
  findOneUser(@Param(':id') id: string) {
    return this.usersServices.findOneUser(id)
  }

  @Patch(':id')
  updateUser(@Param(':id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUser(id, updateUserDto)
  }

  @Delete(':id')
  deleteUser(@Param(':id') id: string) {
    return this.deleteUser(id)
  }
}