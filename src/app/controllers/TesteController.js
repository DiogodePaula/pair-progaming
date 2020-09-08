import Teste from '../models/Teste';
// import Card from '../models/Card';

class TesteController {
  async index(req, res) {
    try {
      const teste = await Teste.findAll({
        // attributes: ['uid', 'name', 'email'],
        // include: [
        //   {
        //     model: Card,
        //     as: 'cards',
        //     attributes: ['uid', 'title', 'content', 'date', 'hour'],
        //   },
        // ],
      });

      return res.json({ teste });
    } catch (error) {
      return res.json({
        error,
      });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const teste = await Teste.findByPk(uid, {
        // attributes: ['uid', 'name', 'email'],
        // include: [
        //   {
        //     model: Card,
        //     as: 'cards',
        //     attributes: ['uid', 'title', 'content', 'date', 'hour'],
        //   },
        // ],
      });

      return res.json({ teste });
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

      const teste = await Teste.create(req.body);

      return res.json({ teste });
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

      const updated = await Teste.update({ where: { uid } });

      return res.json({ updated });
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await Teste.destroy({ where: { uid } });
      if (!deleted) {
        throw Error('Não encontrado');
      }

      return res.json({ deleted });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new TesteController();
