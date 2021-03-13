import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lesson } from "../../../../shared/lesson";

@Injectable()
export class LessonsRepository {

    constructor(@InjectModel('Lesson') private lessonsModel: Model<Lesson>) { }

    search(courseId: string,
        sortOrder: string,
        pageNumber: number,
        pageSize: number) {
        console.log('searching for lessons ', courseId, sortOrder, pageNumber, pageSize);

        return this.lessonsModel.find({
            course: courseId
        },
            null, // here we can specify the fields from the lessonsModel we want to get back, using null to get the full object
            {
                skip: pageNumber * pageSize,
                limit: pageSize,
                sort: {
                    seqNo: sortOrder
                }
            });
    }
}