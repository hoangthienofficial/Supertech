import { useMemo } from "react";

interface UseAvatarProps {
  userImage?: string | null;
  userName?: string;
  defaultBackground?: string;
}

export const useAvatar = ({ userImage, userName, defaultBackground = "#F62682" }: UseAvatarProps) => {
  const avatarStyle = useMemo(() => {
    if (userImage) {
      return {
        backgroundImage: `url(${userImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return {
      backgroundColor: defaultBackground,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  }, [userImage, defaultBackground]);

  const avatarText = useMemo(() => {
    if (!userImage && userName) {
      return userName.charAt(0).toUpperCase();
    }
    return null;
  }, [userImage, userName]);

  return { avatarStyle, avatarText };
};