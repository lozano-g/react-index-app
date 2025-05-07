// dev
export default class AuthenticationService {
    static isAuthenticated: boolean = false;

    static login ( username: string, password: string ): Promise<boolean> {
        const isAuthenticated = username === 'admin' && password === 'admin';

        return new Promise(resolve => {
            setTimeout(() => {
                if (isAuthenticated) {
                    this.isAuthenticated = true;
                    resolve(isAuthenticated);
                }
            }, 1000);
        });
    }
}