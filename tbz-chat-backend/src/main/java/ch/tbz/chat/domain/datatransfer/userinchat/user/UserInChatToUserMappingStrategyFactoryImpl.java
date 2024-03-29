package ch.tbz.chat.domain.datatransfer.userinchat.user;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.MappingStrategyFactoryAdapter;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.datatransfer.userinchat.chat.UserInChatToChatMappingStrategyFactory;
import ch.tbz.chat.domain.model.UserInChat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserInChatToUserMappingStrategyFactoryImpl extends MappingStrategyFactoryAdapter<UserDTO, UserInChat, UserInChatToUserMappingConfiguration> implements UserInChatToUserMappingStrategyFactory {

    private final UserInChatToUserMapper mapper;
    private UserInChatToChatMappingStrategyFactory chatMappingStrategyFactory;

    public UserInChatToUserMappingStrategyFactoryImpl(UserInChatToUserMapper mapper) {
        super(UserInChatToUserMappingConfiguration::new, mapper);
        this.mapper = mapper;
    }

    @Override
    public MappingStrategy<UserDTO, UserInChat> getStrategy(UserInChatToUserMappingConfiguration configuration) {
        if(configuration.isWithChats()) {
            return new WithChatsStrategy(mapper, chatMappingStrategyFactory.getStrategy(configuration.getChatConfiguration()));
        } else if (configuration.isWithRole()) {
            return new WithRoleStrategy(mapper);
        } else {
            return basicStrategy;
        }
    }

    @Autowired
    public void setChatMappingStrategyFactory(UserInChatToChatMappingStrategyFactory chatMappingStrategyFactory) {
        this.chatMappingStrategyFactory = chatMappingStrategyFactory;
    }
}
