import { Module } from '@nestjs/common';

import { CategoriesController } from './controllers/categories/categories.controller';
import { MaterialsController } from './controllers/materials/materials.controller';
import { CategoriesService } from './services/categories/categories.service';
import { MaterialsService } from './services/materials/materials.service';

@Module({
  providers: [CategoriesService, MaterialsService],
  controllers: [CategoriesController, MaterialsController]})
export class MaterialsModule {}
