import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleDto } from './create-module.dto';


export class UpdateModuleDto extends PartialType(CreateModuleDto) {
      // Update a module by ID
  async updateModule(
    id: string,
    updateModuleDto: UpdateModuleDto,
  ): Promise<UpdateModuleDto> {
    const updatedModule = await this.updateModule.findByIdAndUpdate(
      id,
      updateModuleDto,
      { new: true, runValidators: true },
    );

    if (!updatedModule) {
      console.log(`error! Please try again`);
    }

    return updatedModule;
  }
}