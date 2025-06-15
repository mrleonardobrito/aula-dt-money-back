import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Transações')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova transação' })
  @ApiResponse({
    status: 201,
    description: 'Transação criada com sucesso',
    type: CreateTransactionDto
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Res() res: Response,
  ) {
    const createdTransaction =
      await this.transactionService.create(createTransactionDto);
    res.status(HttpStatus.CREATED).send(createdTransaction);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as transações' })
  @ApiResponse({
    status: 200,
    description: 'Lista de transações retornada com sucesso',
    type: [CreateTransactionDto]
  })
  async findAll(@Res() res: Response) {
    const transactions = await this.transactionService.findAll();
    res.status(HttpStatus.OK).send(transactions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma transação pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da transação' })
  @ApiResponse({
    status: 200,
    description: 'Transação encontrada com sucesso',
    type: CreateTransactionDto
  })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const transaction = await this.transactionService.findOne(id);
    res.status(HttpStatus.OK).send(transaction);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma transação' })
  @ApiParam({ name: 'id', description: 'ID da transação' })
  @ApiResponse({
    status: 200,
    description: 'Transação atualizada com sucesso',
    type: CreateTransactionDto
  })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Res() res: Response,
  ) {
    const updatedTransaction = await this.transactionService.update(
      id,
      updateTransactionDto,
    );
    res.status(HttpStatus.OK).send(updatedTransaction);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma transação' })
  @ApiParam({ name: 'id', description: 'ID da transação' })
  @ApiResponse({ status: 204, description: 'Transação removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.transactionService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
