import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rider, RiderDocument } from 'src/schemas/rider.schema';
import { AppResponse } from 'src/utils/response';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';

@Injectable()
export class RidersService {
  constructor(
    @InjectModel(Rider.name) private riderModel: Model<RiderDocument>,
  ) {}

  async create(createRiderDto: CreateRiderDto): Promise<Rider> {
    try {
      const created = new this.riderModel(createRiderDto);
      return await created.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Rider[]> {
    return await this.riderModel.find().exec();
  }

  async findOne(id: string): Promise<Rider> {
    try {
      const rider = await this.riderModel.findById(id);
      if (!rider) {
        throw new NotFoundException('Rider does not exist');
      }
      return rider;
    } catch (error) {
      throw new NotFoundException('Rider does not exist');
    }
  }

  async update(id: string, updateRiderDto: UpdateRiderDto): Promise<Rider> {
    const updated = await this.riderModel.findByIdAndUpdate(
      id,
      updateRiderDto,
      {
        new: true,
      },
    );
    if (!updated) {
      throw new NotFoundException(
        "Rider you're trying to update, does not exist",
      );
    }
    return updated;
  }

  async remove(id: string): Promise<AppResponse> {
    const deleted = await this.riderModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(
        "Rider you're trying to delete, does not exist!",
      );
    }
    return { message: 'Rider deleted successfully', data: deleted };
  }
}
