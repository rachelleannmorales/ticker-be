import { DataTypes } from 'sequelize';
import database from '../config/database'

const Snapshot = database.define('Snapshot', {
    data: {
        type: DataTypes.JSON,
        allowNull: false
    },
}, {
    timestamps: true
});

export default Snapshot;