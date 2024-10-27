import expect from '../libs/expect.js';
import { get_single_user, create_user, update_user, delete_user } from './apis/users.api.js';
import { getUserSchema, createUserSchema } from '../schemas/users.schema.js';


describe('API Testing - reqres.in', () => {
  // Get Single User
  describe('Get Single User <ID>', () => {
    it('check valid response status code for a valid user ID', async () => {
      const response = await get_single_user(2);
      expect(response.status).to.equal(200);
    });

    it('check valid response status code for an invalid user ID', async () => {
      try {
        await get_single_user(999);
      } catch (error) {
        expect(error.response.status).to.equal(404);
      }
    });

    it('check valid JSON schema for a valid user ID', async () => {
      const response = await get_single_user(2);
      expect(response.data).to.be.jsonSchema(getUserSchema);
    });

    it('check invalid JSON schema for an invalid user ID', async () => {
      try {
        await get_single_user(999);
      } catch (error) {
        expect(error.response.data).to.not.be.jsonSchema(getUserSchema);
      }
    });
  });

  // Create User
  describe('Create User', () => {
    it('check valid response status code when creating a user successfully', async () => {
      const newUser = {
        name: "John Doe",
        job: "Software Engineer"
      };
      const response = await create_user(newUser);
      expect(response.status).to.equal(201);
    });

    it('check valid response status code for invalid user data', async () => {
      const invalidUser = {
        job: "Software Engineer"
      };
      try {
        await create_user(invalidUser);
      } catch (error) {
        expect(error.response.status).to.equal(400);
      }
    });

    it('check valid JSON schema when creating a user', async () => {
      const newUser = {
        name: "John Doe",
        job: "Software Engineer"
      };
      const response = await create_user(newUser);
      expect(response.data).to.be.jsonSchema(createUserSchema);
    });

    it('check invalid JSON schema for invalid user data', async () => {
      const invalidUser = {
        job: "Software Engineer"
      };
      try {
        await create_user(invalidUser);
      } catch (error) {
        expect(error.response.data).to.not.be.jsonSchema(createUserSchema);
      }
    });
  });

  // Update User
  describe('Update User <ID>', () => {
    it('check valid response status code when updating user information successfully', async () => {
      const updatedUser = {
        name: "John Doe",
        job: "Senior Software Engineer"
      };
      const response = await update_user(2, updatedUser);
      expect(response.status).to.equal(200);
    });

    it('check valid response status code for updating non-existing user', async () => {
      const updatedUser = {
        name: "John Doe",
        job: "Quality Assurance"
      };
      try {
        await update_user(999, updatedUser);
      } catch (error) {
        expect(error.response.status).to.equal(404);
      }
    });

    it('check valid JSON schema when updating user information', async () => {
      const updatedUser = {
        name: "John Doe",
        job: "Lead Quality Assurance"
      };
      const response = await update_user(2, updatedUser);
      expect(response.data).to.be.jsonSchema(createUserSchema);
    });

    it('check invalid JSON schema for updating non-existing user', async () => {
      const updatedUser = {
        name: "John Doe",
        job: "Quality Assurance"
      };
      try {
        await update_user(999, updatedUser);
      } catch (error) {
        expect(error.response.data).to.not.be.jsonSchema(createUserSchema);
      }
    });
  });

  // Delete User
  describe('Delete User <ID>', () => {
    it('check valid response status code when deleting user successfully', async () => {
      const response = await delete_user(2);
      expect(response.status).to.equal(204);
    });

    it('check valid response status code for deleting non-existing user', async () => {
      try {
        await delete_user(999);
      } catch (error) {
        expect(error.response.status).to.equal(404);
      }
    });

    it('check invalid JSON schema when deleting user', async () => {
      const response = await delete_user(2);
      expect(response.data).to.not.be.jsonSchema(getUserSchema);
    });

    it('check invalid JSON schema for deleting non-existing user', async () => {
      try {
        await delete_user(999);
      } catch (error) {
        expect(error.response.data).to.not.be.jsonSchema(getUserSchema);
      }
    });
  });
});
