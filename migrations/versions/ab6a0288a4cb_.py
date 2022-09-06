"""empty message

Revision ID: ab6a0288a4cb
Revises: 218cc8b6ae69
Create Date: 2022-09-05 19:36:47.389688

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ab6a0288a4cb'
down_revision = '218cc8b6ae69'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('profile_picture', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'profile_picture')
    # ### end Alembic commands ###
