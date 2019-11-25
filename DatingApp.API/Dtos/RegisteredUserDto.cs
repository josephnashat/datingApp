using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class RegisteredUserDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password should be between 4 and 8")]
        public string Password { get; set; }
    }
}