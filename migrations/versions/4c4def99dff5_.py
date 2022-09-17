"""empty message

Revision ID: 4c4def99dff5
Revises: f14d5439ae8b
Create Date: 2022-09-14 17:50:37.004770

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4c4def99dff5'
down_revision = 'f14d5439ae8b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('website', sa.String(length=40), nullable=True))
    op.add_column('users', sa.Column('bio', sa.Text(length=500), nullable=True))
    op.add_column('users', sa.Column('phone_number', sa.String(length=10), nullable=True))
    op.add_column('users', sa.Column('gender', sa.String(length=18), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'gender')
    op.drop_column('users', 'phone_number')
    op.drop_column('users', 'bio')
    op.drop_column('users', 'website')
    # ### end Alembic commands ###