import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const user = await User.findAll({
        attributes: ['uid', 'name', 'age', 'email', 'phone', 'type'],
      });

      return res.json({ user });
    } catch (error) {
      return res.json({
        error,
      });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const user = await User.findByPk(uid, {
        attributes: ['uid', 'name', 'age', 'email', 'phone', 'type'],
        // include: [
        //   {
        //     model: Card,
        //     as: 'cards',
        //     attributes: ['uid', 'title', 'content', 'date', 'hour'],
        //   },
        // ],
      });

      return res.json({ user });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      // const { email } = req.body;

      // const userExist = await User.findOne({ where: { email } });

      // if (userExist) {
      //   throw Error('usuário ja cadastrado');
      // }

      // const user = await User.create(req.body);

      const user = await User.create(req.body);

      return res.json({ user });
    } catch (error) {
      const response = {
        message: 'dados incorretos',
        error,
      };
      return res.json({ response });
    }
  }

  async update(req, res) {
    try {
      const { email, oldPassword } = req.body;

      const { uid } = req.params;

      // aqui ja estou achando o usuário
      const user = await User.findByPk(uid);

      if (email !== user.email) {
        return res.json({ error: 'Usuário não encontrado' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Senha invalida' });
      }
      // e aqui n é necessário acha-lo novamente
      const { name } = await user.update(req.body);

      return res.json({ user: { uid, name, email } });
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await User.destroy({ where: { uid } });
      if (!deleted) {
        throw Error('Não encontrado');
      }

      return res.json({ deleted });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new UserController();
