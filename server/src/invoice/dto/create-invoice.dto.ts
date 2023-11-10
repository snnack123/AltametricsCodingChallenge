import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  details: string;
}
