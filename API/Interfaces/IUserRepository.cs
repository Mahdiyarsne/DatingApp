﻿using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetUserAsync();

        Task<AppUser?> GetUserByIdAsync(int id);

        Task<AppUser?> GetUserByUsernameAsync(string username);

        Task<PageList<MemberDto>> GetMembersAsync(UserParams userParams);

        Task<MemberDto?> GetMemberAsync(string username, bool isCurrentUser);
        Task<AppUser?> GetUserByPhotoId(int photoId);
    }
}
