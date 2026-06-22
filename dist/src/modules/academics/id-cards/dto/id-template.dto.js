"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdTemplateQueryOptionsDto = exports.UpdateIdTemplateDto = exports.CreateIdTemplateDto = exports.IdCardRoleType = void 0;
const page_options_dto_1 = require("../../../../core/utils/pagination/page-options.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var IdCardRoleType;
(function (IdCardRoleType) {
    IdCardRoleType["STUDENT"] = "STUDENT";
    IdCardRoleType["STAFF"] = "STAFF";
    IdCardRoleType["TEMPORARY"] = "TEMPORARY";
})(IdCardRoleType || (exports.IdCardRoleType = IdCardRoleType = {}));
class CreateIdTemplateDto {
    name;
    roleType;
    contentHtml;
    backgroundUrl;
}
exports.CreateIdTemplateDto = CreateIdTemplateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Standard Student ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateIdTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: IdCardRoleType, example: IdCardRoleType.STUDENT }),
    (0, class_validator_1.IsEnum)(IdCardRoleType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateIdTemplateDto.prototype, "roleType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '<div class="id-card"><h1>{{holderName}}</h1></div>' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateIdTemplateDto.prototype, "contentHtml", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://storage/id-bg.png' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdTemplateDto.prototype, "backgroundUrl", void 0);
class UpdateIdTemplateDto extends (0, swagger_1.PartialType)(CreateIdTemplateDto) {
}
exports.UpdateIdTemplateDto = UpdateIdTemplateDto;
class IdTemplateQueryOptionsDto extends page_options_dto_1.PageOptionsDto {
    roleType;
}
exports.IdTemplateQueryOptionsDto = IdTemplateQueryOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: IdCardRoleType }),
    (0, class_validator_1.IsEnum)(IdCardRoleType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], IdTemplateQueryOptionsDto.prototype, "roleType", void 0);
//# sourceMappingURL=id-template.dto.js.map