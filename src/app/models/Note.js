import Sequelize, { Model } from 'sequelize';

class Note extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        note: {
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
        teste_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'teste',
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
    this.belongsTo(models.Teste, {
      as: 'teste',
      foreignKey: 'teste_uid',
    });
    this.belongsTo(models.User, {
      as: 'notes',
      foreignKey: 'user_uid',
    });
  }
}

export default Note;
