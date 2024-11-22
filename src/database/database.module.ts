import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://ahmed_lotfy:123main123@softwareproject-mainclu.ahf0u.mongodb.net/',{}),
    ],
})
export class DatabaseModule {}
