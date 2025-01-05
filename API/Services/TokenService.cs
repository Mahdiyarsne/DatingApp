﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService (IConfiguration config) : ITokenService
    {
        public string CreateToken(AppUser user)
        {
            var tokenkey = config["TokenKey"] ?? throw new Exception("Connot access tokenkey from appsitting");

            if (tokenkey.Length < 64) throw new Exception("Your token key must be longer");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenkey));

            var claims = new List<Claim>
            {
              new(ClaimTypes.NameIdentifier, user.UserName)

            };

            var cards = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = cards,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

 
       
    }

}
