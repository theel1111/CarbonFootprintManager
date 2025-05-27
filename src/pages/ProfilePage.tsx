import React, { useRef, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const lightTheme = {
    background: "#f7f9fc",
    cardBackground: "#ffffff",
    textPrimary: "#333",
    textSecondary: "#666",
    buttonPrimary: "#3B82F6", // blue-500
    buttonSecondary: "#d7d2cc", // gray-300
};

const darkTheme = {
    background: "#1c1c1c",
    cardBackground: "#2a2a2a",
    textPrimary: "#f0f0f0",
    textSecondary: "#ccc",
    buttonPrimary: "#4cc9f0",
    buttonSecondary: "#444",
};

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${(props: any) => props.theme.background};
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
`;

const Container = styled.div`
    max-width: 400px;
    margin: 0 auto;
    background: ${(props) => props.theme.background};
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 2px solid ${(props) => props.theme.buttonPrimary};
`;

const Title = styled.h2`
    margin: 0;
    font-size: 18px;
    color: ${(props) => props.theme.textPrimary};
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 16px;
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
`;

const ThemeToggle = styled.button`
    background: none;
    border: none;
    font-size: 14px;
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
`;

const ContentContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: ${(props) => props.theme.cardBackground};
`;

const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    background-color: #ccc;
    margin: 0 auto;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
    color: ${(props) => props.theme.textPrimary};
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: ${(props) => props.theme.cardBackground};
    color: ${(props) => props.theme.textPrimary};
`;

const Button = styled.button`
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    background: ${(props) => props.theme.buttonPrimary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const SignOutButton = styled.button`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    border: 1px solid #ccc;
    background: ${(props) => props.theme.cardBackground};
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const ProfilePage: React.FC = () => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [username, setUsername] = useState("g0norrh22");
    const [email, setEmail] = useState("example@gmail.com");
    const [theme, setTheme] = useState("light");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAvatarUrl(URL.createObjectURL(file));
        }
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyle />
            <Container>
                <Header>
                    <CloseButton>close</CloseButton>
                    <Title>Profile</Title>
                    <ThemeToggle onClick={toggleTheme}>
                        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                    </ThemeToggle>
                </Header>

                <ContentContainer>
                    <Label>Profile picture</Label>
                    <Avatar
                        src={avatarUrl || "https://via.placeholder.com/80"}
                        alt="Avatar"
                    />
                    <Button onClick={handleAvatarClick}>
                        Change Profile picture
                    </Button>
                    <HiddenFileInput
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    <Label>username</Label>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Label>Email</Label>
                    <div>example@gmail.com</div>

                    <Label>Password</Label>
                    <Button>Change Password</Button>
                </ContentContainer>

                <SignOutButton>Sign Out</SignOutButton>
            </Container>
        </ThemeProvider>
    );
};

export default ProfilePage;


