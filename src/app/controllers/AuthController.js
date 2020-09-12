import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class AuthController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha Invalida' });
      }

      if (req.userType === 1) {
        const { uid } = req.params;
        const aluno = await User.findOne({ where: { uid } });

        return res.json({ aluno });
      }

      if (req.userType === 2) {
        const aluno = await User.findAll();

        return res.json({ aluno });
      }

      const { uid, name, type } = user;

      return res.json({
        user: {
          uid,
          name,
          email,
          type,
        },
        token: jwt.sign({ uid }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new AuthController();
