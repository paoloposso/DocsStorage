package user

type User struct {
	ID       string `json:"id,omitempty" bson:"_id,omitempty"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"-"`
	Role     Role   `json:"role"`
}

type Role string

const (
	RoleAdmin     Role = "admin"
	RoleUser      Role = "user"
	RoleModerator Role = "moderator"
)

type UserRepository interface {
	CreateUser(user User) (string, error)
	GetUserByID(id string) (*User, error)
	GetUserByEmail(email string) (*User, error)
}
