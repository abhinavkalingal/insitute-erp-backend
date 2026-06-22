"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentInstitute = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentInstitute = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
        throw new common_1.ForbiddenException('User not authenticated');
    }
    if (user.instituteId) {
        return user.instituteId;
    }
    const targetInstituteId = request.headers['x-institute-id'] || request.headers['x-tenant-id'];
    if (!targetInstituteId) {
        throw new common_1.ForbiddenException('Super Admin must provide x-institute-id header to perform tenant-specific actions');
    }
    return targetInstituteId;
});
//# sourceMappingURL=current-institute.decorator.js.map