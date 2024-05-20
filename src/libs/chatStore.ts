import { create } from "zustand";
import { useUserStore } from "./userStore";

export type Message = {
  createdAt: string;
  messages: {
    senderId: string;
    text: string;
    img?: string;
    createdAt?: string | Date;
  }[];
};

export type User = {
  avatar: string;
  blocked: string[];
  email: string;
  id: string;
  username: string;
};
export type ChatDoc = {
  receiverId: string;
  updatedAt: number;
};

export type Chats = ChatDoc & {
  chatId?: string;
  lastMessage?: string;
  user: User;
  isSeen?: boolean;
};

type ChatStore = {
  chatId: string | null;
  user: User | null;
  isCurrentUserBlocked: boolean;
  isReceiverBlocked: boolean;
  changeChat: (chatId: string, user: User) => void;
  changeBlocked: () => void;
};
export const useChatStore = create<ChatStore>((set) => ({
  chatId: "",
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId: string, user: User) => {
    const currentUser = useUserStore.getState().currentUser;
    // check if current user is blocked
    if (currentUser) {
      if (user.blocked.includes(currentUser?.id)) {
        return set({
          chatId,
          user: null,
          isCurrentUserBlocked: true,
          isReceiverBlocked: false,
        });
      } else if (currentUser?.blocked.includes(user.id)) {
        return set({
          chatId,
          user: user,
          isCurrentUserBlocked: false,
          isReceiverBlocked: true,
        });
      } else {
        return set({
          chatId,
          user,
          isCurrentUserBlocked: false,
          isReceiverBlocked: false,
        });
      }
    }
    // check if receiver user is blocked
  },
  changeBlocked: () => {
    set((state) => {
      return { ...state, isReceiverBlocked: !state.isReceiverBlocked };
    });
  },
}));
