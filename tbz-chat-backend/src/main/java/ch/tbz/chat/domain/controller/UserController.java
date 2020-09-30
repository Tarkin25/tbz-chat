package ch.tbz.chat.domain.controller;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.datatransfer.user.UserMapper;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final MappingStrategy<UserDTO, User> userMappingStrategy;
    private final UserMapper userMapper;

    public UserController(UserService userService, MappingStrategy<UserDTO, User> userMappingStrategy, UserMapper userMapper) {
        this.userService = userService;
        this.userMappingStrategy = userMappingStrategy;
        this.userMapper = userMapper;
    }

    @PostMapping
    public ResponseEntity<UserDTO> register(@RequestBody @Valid UserDTO.Registration userDTO) {
        User user = userService.create(userMapper.user(userDTO));

        return new ResponseEntity<>(userMappingStrategy.map(user), HttpStatus.CREATED);
    }

    @GetMapping("/own")
    public ResponseEntity<UserDTO> getAuthenticated(@AuthenticationPrincipal(expression = "user") User user) {
        return new ResponseEntity<>(userMappingStrategy.map(user), HttpStatus.OK);
    }

}
