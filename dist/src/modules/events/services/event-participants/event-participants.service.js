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
exports.EventParticipantsService = void 0;
const page_dto_1 = require("../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let EventParticipantsService = class EventParticipantsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(registerDto) {
        const event = await this.prisma.event.findUnique({
            where: { id: registerDto.eventId },
            include: {
                _count: {
                    select: { participants: { where: { status: 'CONFIRMED' } } }
                }
            }
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (!event.isRegistrationRequired) {
            throw new common_1.BadRequestException('This event does not require registration');
        }
        if (event.status === 'CANCELLED' || event.status === 'COMPLETED') {
            throw new common_1.ConflictException(`Cannot register. Event is ${event.status}`);
        }
        if (event.maxParticipants !== null) {
            const currentCount = event._count.participants;
            if (currentCount >= event.maxParticipants) {
                throw new common_1.ConflictException('Event registration is full');
            }
        }
        const studentId = registerDto.studentId;
        const staffId = registerDto.staffId;
        if (studentId) {
            const student = await this.prisma.student.findUnique({ where: { id: studentId } });
            if (!student)
                throw new common_1.NotFoundException('Student not found');
        }
        else if (staffId) {
            const staff = await this.prisma.staff.findUnique({ where: { id: staffId } });
            if (!staff)
                throw new common_1.NotFoundException('Staff not found');
        }
        else if (!registerDto.guestName) {
            throw new common_1.BadRequestException('Must provide either studentId, staffId, or guestName');
        }
        if (studentId || staffId) {
            const existing = await this.prisma.eventParticipant.findFirst({
                where: {
                    eventId: registerDto.eventId,
                    OR: [{ studentId: studentId || undefined }, { staffId: staffId || undefined }],
                    status: 'CONFIRMED'
                }
            });
            if (existing) {
                throw new common_1.ConflictException('You are already registered for this event');
            }
        }
        return this.prisma.eventParticipant.create({
            data: {
                eventId: registerDto.eventId,
                studentId,
                staffId,
                guestName: registerDto.guestName,
                guestEmail: registerDto.guestEmail
            }
        });
    }
    async findAll(queryOptions) {
        const where = {
            event: {}
        };
        if (queryOptions.eventId) {
            where.eventId = queryOptions.eventId;
        }
        const itemCount = await this.prisma.eventParticipant.count({ where });
        const participants = await this.prisma.eventParticipant.findMany({
            where,
            orderBy: { registrationDate: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                event: { select: { title: true } },
                student: { include: { user: { select: { firstName: true, lastName: true } } } },
                staff: { include: { user: { select: { firstName: true, lastName: true } } } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(participants, pageMetaDto);
    }
    async cancelRegistration(id) {
        const participant = await this.prisma.eventParticipant.findFirst({
            where: { id, event: {} }
        });
        if (!participant) {
            throw new common_1.NotFoundException('Participant registration not found');
        }
        return this.prisma.eventParticipant.update({
            where: { id },
            data: { status: 'CANCELLED' }
        });
    }
};
exports.EventParticipantsService = EventParticipantsService;
exports.EventParticipantsService = EventParticipantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventParticipantsService);
//# sourceMappingURL=event-participants.service.js.map