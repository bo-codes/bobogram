"""empty message

Revision ID: f14d5439ae8b
Revises: ab6a0288a4cb
Create Date: 2022-09-05 20:17:33.266231

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f14d5439ae8b'
down_revision = 'ab6a0288a4cb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('full_name', sa.String(length=30), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'full_name')
    # ### end Alembic commands ###
