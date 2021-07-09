from .db_session import SqlAlchemyBase
import sqlalchemy
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin


class Parcel(SqlAlchemyBase, UserMixin, SerializerMixin):
    __tablename__ = 'info'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    groundPH = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    waterPPM = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    waterOpacity = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    waterSalt = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    waterPH = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    airPM25 = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    airPPM = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    date = sqlalchemy.Column(sqlalchemy.DateTime, nullable=True)


