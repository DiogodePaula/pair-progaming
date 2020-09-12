import Sequelize, { Model } from 'sequelize';

class Teste extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        matter: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        user_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'user',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Note, {
      as: 'teste',
      foreignKey: 'teste_uid',
    });

    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uid',
    });
  }
}

export default Teste;
