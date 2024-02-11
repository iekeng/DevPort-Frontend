import axios from "axios";

class AuthService {
    async signUp(githubId, githubToken) {
        try {
            const response = await axios.post("/auth/signup", {
                githubId,
                githubToken,
            });

            if (response.data.accessToken) {
                this.saveTokenAndUserId(response.data.accessToken, response.data.userId);
            }

            return response.data;
        } catch (error) {
            console.error("Error signing up:", error);
        }
    }

    async signUpWithGitHub(code) {
        try {
            const response = await axios.post("https://github.com/login/oauth/access_token",
                {
                    client_id: "829a74c5da72aa7b820c",
                    client_secret: "dee0a345dbb4d993fefbeacf7c5372b15173b083",
                    code: code,
                },
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
    
            // Check if the response contains an access_token
            if (response.data.accessToken) {
                return response.data.accessToken;
            } else {
                throw new Error("Access token not found in the response.");
            }
        } catch (error) {
            console.error("Error signing up with GitHub:", error);
            throw error; // Re-throw the error for further handling in the calling function.
        }
    }

    saveTokenAndUserId(accessToken, userId) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
    }

    logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
    }

    isAuthenticated() {
        return localStorage.getItem("accessToken") !== null;
    }
}

const authService = new AuthService();

export default authService;