import { string } from "joi";
import {
  NotFoundException,
  AlreadtExist,
  BadCredentials,
  EmailDeleted,
} from "../../common/exceptions";
import {
  UserSchemaCreate,
  UserSchemaLogin,
} from "../../common/schemas/user.schema";
import { User } from "../models/user.entity";
import { UserRepository, userRepository } from "../repositry/user.repository";
import * as bycript from "bcrypt";
import jwt from "jsonwebtoken";
import { mailSender, Mailer } from "../../common/utils/mailer";

export class UserService {
  secretKey: string;

  constructor(
    private readonly userRepo: UserRepository,
    private readonly mailSenderService: Mailer
  ) {
    this.secretKey = "your-secret-key";
  }

  async hash_pass(password: string): Promise<string> {
    try {
      // Generate a salt
      const salt = await bycript.genSalt(10);
      // Hash the password with the salt
      const hashedPassword = await bycript.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password");
    }
  }
  async verify_password(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      // Compare the provided password with the hashed password
      return await bycript.compare(password, hashedPassword);
    } catch (error) {
      throw new Error("Error verifying password");
    }
  }
  async authenticate(email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) return null;

    if (!this.verify_password(password, user.password)) return null;

    return user;
  }

  create_access_token(data: object, expiresIn: string = "1h"): string {
    return jwt.sign({ data }, this.secretKey, { expiresIn: expiresIn });
  }

  decode(token: string): any {
    const data: any = jwt.verify(token, this.secretKey);
    return data?.data;
  }

  async register(data: UserSchemaCreate): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ email: data.email });
    if (user) throw new AlreadtExist("Email already exist");

    data.password = await this.hash_pass(data.password);
    const new_user = await this.userRepo.create_user(data);

    const token = this.create_access_token({ sub: data.email }, "24h");
    await this.mailSenderService.sendVerificationToken(data.email, token);

    return new_user;
  }

  async login(data: UserSchemaLogin): Promise<string> {
    const user = await this.authenticate(data.email, data.password);
    if (!user) throw new BadCredentials("wrong email or password");
    if (user.is_deleted) throw new EmailDeleted("email deleted");
    const access_token = this.create_access_token({ sub: data.email });
    return access_token;
  }

  async verify_account(token: string) {
    const data = this.decode(token);
    await this.userRepo.update_verified_status(data.email);
  }

  async myProfile(email: string) {
    const user = await this.userRepo.get_user_by_email(email);
    return user;
  }
  async forgot_password(email: string) {
    const user = await this.userRepo.get_user_by_email(email);
    if (!user) throw new NotFoundException("account does not exist");

    const data_token = {
      sub: user.email,
    };
    const token = this.create_access_token(data_token);
    return token;
  }
  async reset_password(reset_token: string, new_password: string) {
    const data = this.decode(reset_token);
    console.log(data);
    const email = data.sub;
    const user = await this.userRepo.get_user_by_email(email);
    const updated_password_hashed = await this.hash_pass(new_password);
    await this.userRepo.update_password(email, updated_password_hashed);
  }
}

export const userService = new UserService(userRepository, mailSender);
