package user

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

// GetUserByEmail returns a user by ID.
func (s *UserService) GetUserByID(id string) (*User, error) {
	return s.userRepository.GetUserByID(id)
}
