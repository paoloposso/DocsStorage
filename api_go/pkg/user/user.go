package user

type User struct {
	ID       string `json:"id,omitempty" bson:"_id,omitempty"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"-"`
}

type UserService struct {
	userRepository UserRepository
}

func NewUserService(userRepository UserRepository) *UserService {
	return &UserService{
		userRepository: userRepository,
	}
}

// CreateUser creates a new user.
func (s *UserService) CreateUser(user User) (string, error) {
	hashPassword, err := encryptPassword(user.Password)
	if err != nil {
		return "", err
	}
	user.Password = hashPassword

	id, err := s.userRepository.CreateUser(user)
	if err != nil {
		return "", err
	}
	return id, nil
}

func (s *UserService) GetUserByID(id string) (*User, error) {
	return s.userRepository.GetUserByID(id)
}

type UserRepository interface {
	CreateUser(user User) (string, error)
	GetUserByID(id string) (*User, error)
	GetUserByEmail(email string) (*User, error)
}
