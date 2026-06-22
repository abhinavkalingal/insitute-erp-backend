"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const event_categories_controller_1 = require("./controllers/event-categories/event-categories.controller");
const event_participants_controller_1 = require("./controllers/event-participants/event-participants.controller");
const events_controller_1 = require("./controllers/events/events.controller");
const event_categories_service_1 = require("./services/event-categories/event-categories.service");
const event_participants_service_1 = require("./services/event-participants/event-participants.service");
const events_service_1 = require("./services/events/events.service");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        providers: [event_categories_service_1.EventCategoriesService, events_service_1.EventsService, event_participants_service_1.EventParticipantsService],
        controllers: [event_categories_controller_1.EventCategoriesController, events_controller_1.EventsController, event_participants_controller_1.EventParticipantsController]
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map