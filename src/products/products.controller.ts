import {
    Controller,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    Res,
    Query,
    ParseIntPipe,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    ValidationPipe,
    BadRequestException,

} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product/product.interface';
import { ProductDto } from './dto/product.dto/product.dto';
import { ProductPatchDto } from './dto/product-patch.dto/product-patch.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    //Sin el servicio Codigo 1
    /*@Get()
    getHelloInProducts(): string {
        return "Estamos en productos!!!";
    }

    @Get('hot')
    getSpecialProducts(): string {
        return "Te vamos a mostrar los productos más calientes!!";
    }

    /*@Get(':id')
    find(@Param() params) {
        return `Estás consultando el producto ${params.id}`;
    }*/

    /*@Get(':id/:size')
    findWithSize(@Param() params) {
        return `En esta ruta obtenemos el producto ${params.id}, pero en su tamaño ${params.size}`;
    }
    //Desestructuración de parámetros
    /*@Get(':id')
    find(@Param('id') id: number) {
        return `Página del producto ${id}`;
    }

    @Get(':id/:size')
    findWithSize(@Param('id') id: number, @Param('size') size: string) {
        return `Página de detalle de producto ${id}, en tamaño ${size}`;
    }*/
    //El método POST es para realizar una operación de inserción.
    /*@Post()
    createProduct() {
        return 'Estamos atendiendo una solicitud de tipo Post';
    }*/
    /*@Post()
    createProduct(@Body() body) {
        return `Creo un producto ${body.name} con descripción ${body.description}`;
    }*/
    //para depurar mejor el cuerpo de la request para certificarte que estás recibiendo alguna cosa por post, o te está llegando vacío el contenido de body
    /*@Post()
    createProduct(@Body() body) {
        return body;
    }*/
    //Para indicar el nombre del dato que vamos a recibir
    /*@Post()
    createProduct(
        @Body('name') name: string,
        @Body('description') description: string
    ) {
        return `Creo el producto ${name} con descripción ${description}.`;
    }*/
    //Con status de respuesta
    /*@Post()
    @HttpCode(204)
    createProduct(@Body() body) {
        return body;
    }*/
    /*@Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    createProduct(@Body() body) {
        return body;
    }

    @Get('ruta-error-404')
    @HttpCode(HttpStatus.NOT_FOUND)
    rutaConError404() {
        return 'Esto es un error 404!!';
    }

    @Get(':id')
    find(@Res() response, @Param('id') id: number) {
        if (id < 100) {
            return response.status(HttpStatus.OK).send(`Página del producto ${id}`);
        } else {
            return response.status(HttpStatus.NOT_FOUND).send(`Producto inexistente`);
        }
    }
    @Put(':id')
    update(@Param('id') id: number, @Body() body) {
        return `Estás haciendo una operación de actualización del recurso ${id} 
          con ${body.name} y ${body.description}`;
    }
    @Patch(':id')
    partialUpdate(@Param('id') id: number, @Body() body) {
        return `Actualización parcial del ítem ${id}`;
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: number) {
        return `Hemos borrado el producto ${id}`;
    }
    @Get('query')
    rutaQuery(@Query() query) {
        //return query;
        return `El dato query.x ha recibido el valor ${query.x}`;
    }
    /*@Get('cars')
    carsQuery(@Query('count') carCount: number) {
        return carCount;
    }*/
    /*@Get('cars')
    carsQuery(@Query('count', ParseIntPipe) carCount: number) {
        return carCount;
    }*/



    //Para el servicio Codigo 2

    @Get()
    getAllProducts(): Product[] {
        return this.productsService.getAll();
    }

    @Get(':id')
    async find(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.getId(id);
    }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    createProduct(
        @Body() productDto: ProductDto,
    ) {
        this.productsService.insert(productDto);
    }

    /*@Post()
    createProduct(@Body() productDto: ProductDto) {
        this.productsService.insert(productDto);
    }*/

    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
        @Body() body,
    ) {
        return this.productsService.update(id, body);
    }

    @Patch(':id')
    async patch(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: ProductPatchDto,
    ) {
        return this.productsService.patch(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: number) {
        this.productsService.delete(id);
    }
}
