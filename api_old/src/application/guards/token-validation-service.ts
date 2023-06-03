export default abstract class ITokenValidationService {
    abstract validateToken(token: string): { userId: string, role: string };
}