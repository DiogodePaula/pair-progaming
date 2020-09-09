import Note from '../models/Note';
import Teste from '../models/Teste';
import User from '../models/User';

class NoteController {
  async index(req, res) {
    try {
      const note = await Note.findAll({
        attributes: ['uid', 'note', 'description'],
        include: [
          {
            model: Teste,
            as: 'teste',
            attributes: ['uid', 'matter', 'description'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['uid', 'name', 'age', 'email', 'phone', 'type'],
          },
        ],
      });

      return res.json({ note });
    } catch (error) {
      return res.json({
        error,
      });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const note = await Note.findByPk(uid, {
        attributes: ['uid', 'note', 'description'],
        include: [
          {
            model: Teste,
            as: 'teste',
            attributes: ['uid', 'matter', 'description'],
          },
        ],
      });

      return res.json({ note });
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

      const note = await Note.create(req.body);

      return res.json({ note });
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
      // const { email, oldPassword } = req.body;

      const { uid } = req.params;

      const updated = await Note.update({ where: { uid } });

      return res.json({ updated });
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await Note.destroy({ where: { uid } });
      if (!deleted) {
        throw Error('Não encontrado');
      }

      return res.json({ deleted });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new NoteController();
