import { isString } from 'class-validator'

import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class NationalIdPipe implements PipeTransform {
  async transform(value: unknown) {
    if (!isString(value) || value.length !== 10) {
      throw new BadRequestException(`Missing or invalid national id value`)
    }
    return value
  }
}
