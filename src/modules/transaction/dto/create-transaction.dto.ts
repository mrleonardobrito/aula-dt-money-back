import { TransactionType } from '@prisma/client';
import { IsEnum, IsString, MinLength, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Título da transação',
    example: 'Compra de supermercado',
    minLength: 5
  })
  @IsString({ message: 'Title must be a string' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title: string;

  @ApiProperty({
    description: 'Categoria da transação',
    example: 'Alimentação'
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Data da transação',
    example: '2024-03-15T10:00:00Z'
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  data: Date;

  @ApiProperty({
    description: 'Valor da transação',
    example: 150.50
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Tipo da transação (INCOME ou OUTCOME)',
    enum: TransactionType,
    example: 'INCOME'
  })
  @IsEnum(TransactionType)
  type: TransactionType;
}
