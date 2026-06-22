import { PrismaService } from '@infrastructure/database/prisma.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const existing = await this.prisma.role.findFirst({
      where: {
        name: createRoleDto.name}});

    if (existing) {
      throw new ConflictException('Role already exists for this institute');
    }

    const { permissionIds, ...roleData } = createRoleDto;

    return this.prisma.role.create({
      data: {
        ...roleData,
        permissions: permissionIds
          ? {
              create: permissionIds.map((permissionId) => ({
                permission: { connect: { id: permissionId } }}))}
          : undefined},
      include: {
        permissions: {
          include: { permission: true }}}});
  }

  findAll() {
    return this.prisma.role.findMany({
      include: {
        permissions: {
          include: { permission: true }}}});
  }

  async remove(id: string) {
    const existing = await this.prisma.role.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Role not found');
    }

    await this.prisma.role.delete({ where: { id } });
    return { message: 'Role deleted successfully' };
  }

  async assignRoleToUser(userId: string, roleId: string) {
    // Check if both exist
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    if (!role) throw new NotFoundException('Role not found');

    // Assign
    await this.prisma.userRole.create({
      data: {
        userId,
        roleId}});

    return { message: 'Role assigned successfully' };
  }
}
