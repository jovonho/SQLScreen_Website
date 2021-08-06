"""update savedquery

Revision ID: 672800de0edc
Revises: ac0ae41cd272
Create Date: 2021-05-25 18:01:55.178697

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '672800de0edc'
down_revision = 'ac0ae41cd272'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('saved_query', 'run_at2')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('saved_query', sa.Column('run_at2', postgresql.TIME(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###