import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './interfaces/product/product.interface';
import { ProductPatchDto } from './dto/product-patch.dto/product-patch.dto';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 1,
            name: 'Vela aromática',
            description: 'Esta vela lanza ricos olores',
 
        },
        {
            id: 2,
            name: 'Marco de fotos pequeño',
            description: 'Marco ideal para tus fotos 10x15',

        }
    ];

    getAll(): Product[] {
        return this.products;
    }

    getId(id: number): Product {
        const product = this.products.find((item: Product) => item.id == id);
        if (product) {
            return product;
        } else {
            throw new NotFoundException(`No encontramos el producto ${id}`, "No encontrado");
        }
    }

    /*insert(body: any) {
        this.products = [
            ...this.products,
            {
                id: this.lastId() + 1,
                name: body.name,
                description: body.description,
            }
        ];
    }*/
    insert(body: any) {
        if (!body.name || !body.description) {
            throw new HttpException('Datos insuficientes para crear el producto', HttpStatus.BAD_REQUEST);
        }

        const newId = this.lastId() + 1;
        const newProduct: Product = {
            id: newId,
            name: body.name,
            description: body.description,
        };

        this.products.push(newProduct);
    }

    /*update(id: number, body: any) {
        let product: Product = {
            id,
            name: body.name,
            description: body.description,
        }
        this.products = this.products.map((item: Product) => {
            console.log(item, id, item.id == id);
            return item.id == id ? product : item;
        });
    }*/

    update(id: number, body: any) {
        if (!body.name && !body.description) {
            throw new HttpException('Datos insuficientes para actualizar el producto', HttpStatus.BAD_REQUEST);
        }

        const productIndex = this.products.findIndex((item: Product) => item.id == id);
        if (productIndex === -1) {
            throw new NotFoundException(`No se encontró el producto con ID ${id}`, "No encontrado");
        }

        const updatedProduct: Product = {
            ...this.products[productIndex],
            name: body.name || this.products[productIndex].name,
            description: body.description || this.products[productIndex].description,
        };

        this.products[productIndex] = updatedProduct;
    }

    patch(id: number, body: ProductPatchDto) {
        let previousProduct = this.getId(id);
        let product: Product = {
            ...previousProduct,
            ...body
        }
        this.products = this.products.map((item: Product) => {
            return item.id == id ? product : item;
        });
    }

    delete(id: number) {
        const product = this.products.find((item: Product) => item.id == id);
        if (product) {
            this.products = this.products.filter((item: Product) => item.id != id);
        } else {
            throw new HttpException(`No existe el producto ${id}`, HttpStatus.NOT_FOUND);
        }
    }

    private lastId(): number {
        return this.products[this.products.length - 1].id;
    }

}
